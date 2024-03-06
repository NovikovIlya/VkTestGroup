import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Empty } from 'antd';
import './Group.css';
import { Group } from '../types/types';

import OneGroup from '../components/oneGroup/oneGroup';
import Skeleton from '../components/skeleton/skeleton';
import SelectComponent from '../components/select/SelectComponent';

function Groups() {
  // Data
  const [friends, setFriends] = useState('');
  const [isClosed, setIsClosed] = useState('');
  const [color, setColor] = useState('');
  const [unFriend, setunFriend] = useState(false);
  const [group, setGroup] = useState([]);
  const [showFriend, setShowFriend] = useState<number[]>([]);

  // Hooks
  const { refetch, isLoading, isError, data } = useQuery({
    queryKey: ['todos', friends, color, isClosed],
    queryFn: () => getTodos(friends, color, isClosed),
  });

  const getTodos = async (color: string, isClosed: string, friends: string) => {
    const res = await fetch(
      `https://78b9877e282ef0f7.mokky.dev/all?${color}${isClosed}&${friends}`,
    );
    const data = await res.json();
    return data;
  };

  //// Фильтруем группы в случае если выбирается "без друзей"
  useEffect(() => {
    if (unFriend) {
      setGroup(data.filter((item: Group) => !item.friends));
    } else {
      setGroup(data);
    }
  }, [data, unFriend]);

  // Functions
  const handleChangeClosed = (value: string) => {
    setTimeout(() => {
      if (value === 'Закрытая') {
        setIsClosed(`&closed=true`);
      } else if (value === 'Открытая') {
        setIsClosed(`&closed=false`);
      } else {
        setIsClosed('');
      }
    }, 1000);
  };
  const handleChangeColor = (value: string) => {
    setTimeout(() => {
      if (value === 'Красный') {
        setColor(`&avatar_color=red`);
      }
      if (value === 'Желтый') {
        setColor(`&avatar_color=yellow`);
      }
      if (value === 'Все') {
        setColor('');
      }
      if (value === 'Синий') {
        setColor(`&avatar_color=blue`);
      }
      if (value === 'Зеленый') {
        setColor(`&avatar_color=green`);
      }
      if (value === 'Оранжевый') {
        setColor(`&avatar_color=orange`);
      }
      if (value === 'Фиолетовый') {
        setColor(`&avatar_color=purple`);
      }
    }, 1000);
  };
  const handleChangeFriends = (value: string) => {
    setTimeout(() => {
      if (value === 'Все') {
        setFriends(() => '');
        setunFriend(false);
        refetch();
      } else if (value === 'Есть друзья') {
        setunFriend(false);
        setFriends(`friends.first_name=*`);
      } else {
        setunFriend(true);
        setFriends(() => '');
        refetch();
      }
    }, 1000);
  };
  const showFriends = (id: number) => {
    if (showFriend.includes(id)) {
      setShowFriend(showFriend.filter((item) => item !== id));
      return;
    }
    setShowFriend([...showFriend, id]);
  };

  return (
    <>
      <div className="main">
        <div className="select">
          <SelectComponent
            handleChangeFriends={handleChangeFriends}
            handleChangeClosed={handleChangeClosed}
            handleChangeColor={handleChangeColor}
          />
        </div>

        {group?.map((item: Group) => (
          <OneGroup key={item.id} item={item} showFriend={showFriend} showFriends={showFriends} />
        ))}
      </div>
      {isLoading && (
        <div className="zagr">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      )}
      {isError || (data?.result === 0 && <div>Произошла ошибка</div>)}
      {data?.length === 0 && (
        <div>
          <Empty description={false} />
          <div className="textNot">Ничего не найдено</div>
        </div>
      )}
    </>
  );
}

export default Groups;
