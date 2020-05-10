import React from 'react';
import { useQuery, QueryResult, useMutation } from 'react-apollo';
import { USER_PROFILE } from '../../sharedNotLocalQueries';
import { userProfile } from '../../types/api';
import MenuPresenter from './MenuPresenter';
import { TOGGLE_DRIVING } from './MenuQueries';
import { toast } from 'react-toastify';

const MenuContainer = () => {
  const {
    data,
    loading,
  }: QueryResult<userProfile, Record<string, any>> = useQuery(USER_PROFILE);

  const [toggleDrivingFn] = useMutation(TOGGLE_DRIVING, {
    refetchQueries: () => [{ query: USER_PROFILE }],
    update: (cache, { data: toggleData }) => {
      if (data) {
        const { ToggleDrivingMode } = toggleData;
        if (!ToggleDrivingMode.ok) {
          toast.error(ToggleDrivingMode.error);
          return;
        }
        const query: userProfile | null = cache.readQuery({
          query: USER_PROFILE,
        });
        if (query) {
          const {
            GetMyProfile: { user },
          } = query;
          if (user) {
            user.isDriving = !user.isDriving;
          }
        }
        cache.writeQuery({ query: USER_PROFILE, data: query });
      }
    },
  });

  return (
    <MenuPresenter
      data={data}
      loading={loading}
      toggleDrivingFn={toggleDrivingFn}
    />
  );
};

export default MenuContainer;
