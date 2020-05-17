import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { USER_PROFILE } from '../../sharedNotLocalQueries';
import ChatPresenter from './ChatPresenter';
import { GET_CHAT, SEND_MESSAGE } from './ChatQueries';
import routes from '../../config/routes';
import { useQuery, useMutation } from 'react-apollo';

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
  const { data, loading } = useQuery(GET_CHAT, {
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
