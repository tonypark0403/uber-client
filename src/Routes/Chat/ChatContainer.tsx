import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { USER_PROFILE } from '../../sharedNotLocalQueries';
import ChatPresenter from './ChatPresenter';
import { GET_CHAT, SEND_MESSAGE, SUBSCRIBE_TO_MESSAGES } from './ChatQueries';
import routes from '../../config/routes';
import { useQuery, useMutation } from 'react-apollo';
import { SubscribeToMoreOptions } from 'apollo-client';

interface IProps extends RouteComponentProps<any> {}

const ChatContainer = (props: IProps) => {
  const {
    match: {
      params: { chatId },
    },
  } = props;
  if (!chatId) {
    props.history.push(routes.home);
  }

  const [message, setMessage] = useState('');

  const { data: userData } = useQuery(USER_PROFILE);
  const { data, loading, subscribeToMore } = useQuery(GET_CHAT, {
    variables: { chatId: Number(chatId) },
  });

  const [sendMessageFn] = useMutation(SEND_MESSAGE);

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const {
      target: { value },
    } = event;
    setMessage(value);
  };

  const onSubmit = () => {
    const {
      match: {
        params: { chatId },
      },
    } = props;
    if (message !== '') {
      setMessage('');
      sendMessageFn({
        variables: {
          chatId: Number(chatId),
          text: message,
        },
      });
    }
    return;
  };

  //subscription
  const subscribeToMoreOptions: SubscribeToMoreOptions = {
    document: SUBSCRIBE_TO_MESSAGES,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) {
        return prev;
      }
      const {
        data: { MessageSubscription },
      } = subscriptionData;
      const {
        GetChat: {
          chat: { messages },
        },
      } = prev;

      if (messages.length > 0) {
        const newMessageId = MessageSubscription.id;
        const latestMessageId = messages[messages.length - 1].id;

        if (newMessageId === latestMessageId) {
          return;
        }
      }
      const newObject = Object.assign({}, prev, {
        GetChat: {
          ...prev.GetChat,
          chat: {
            ...prev.GetChat.chat,
            messages: [...prev.GetChat.chat.messages, MessageSubscription],
          },
        },
      });
      return newObject;
    },
  };

  subscribeToMore(subscribeToMoreOptions);

  return (
    <ChatPresenter
      data={data}
      loading={loading}
      userData={userData}
      messageText={message}
      onInputChange={onInputChange}
      onSubmit={onSubmit}
    />
  );
};

export default ChatContainer;
