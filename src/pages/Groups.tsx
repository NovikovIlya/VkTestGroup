import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Select, Space, Card, Collapse, Popover, Button,Spin ,Empty } from 'antd';
import './Group.css';
import { Group, User } from '../types/types';
import OneGroup from '../components/oneGroup/oneGroup';
import Skeleton from '../components/skeleton/skeleton';

function Groups() {
  // Data
  const [friends, setFriends] = useState('');
  const [isClosed, setIsClosed] = useState('');
  const [color, setColor] = useState('');
  const [unFriend, setunFriend] = useState(false);
  const [group, setGroup] = useState([]);
  const [showFriend, setShowFriend] = useState<number[]>([]);

  // Hooks
  const { refetch, isPending, isLoading,isError, data } = useQuery({
    queryKey: ['todos', friends, color, isClosed],
    queryFn: () => getTodos(friends, color, isClosed, unFriend),
  });

  const getTodos = async (color: string, isClosed: string, friends: string, unFriend: boolean) => {
    const res = await fetch(
      `https://78b9877e282ef0f7.mokky.dev/all?${color}${isClosed}&${friends}`,
    );
    const data = await res.json();

    return data;
  };

  //// Фильтруем группы в случае если выбирается "без друзей"
  useEffect(() => {
    // getCats();
    if (unFriend) {
      setGroup(data.filter((item: Group) => !item.friends));
    } else {
      setGroup(data);
    }
  }, [data, unFriend]);

  // Functions
  const handleChangeClosed = (value: string) => {
    setTimeout(() => {
      console.log(`selected ${value}`);
      if (value === 'Закрытая') {
        console.log('1');
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
      console.log(`selected ${value}`);
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

    //@ts-ignore
    setShowFriend([...showFriend, id]);
  };

  return (
    <>
      <div className="main">
        <div className="select">
          <Space className="sel" wrap>
            <Select
              className="ss"
              defaultValue="Все группы"
              style={{ width: 120 }}
              onChange={handleChangeClosed}
              options={[
                { value: '', label: 'Все группы' },
                { value: 'Закрытая', label: 'Закрытая' },
                { value: 'Открытая', label: 'Открытая' },
              ]}
            />

            <Select
              className="ss"
              defaultValue="Все"
              style={{ width: 120 }}
              onChange={handleChangeColor}
              options={[
                { value: 'Все', label: 'Все цвета' },
                { value: 'Красный', label: 'Красный' },
                { value: 'Зеленый', label: 'Зеленый' },
                { value: 'Желтый', label: 'Желтый' },
                { value: 'Синий', label: 'Синий' },
                { value: 'Фиолетовый', label: 'Фиолетовый' },
                { value: 'Оранжевый', label: 'Оранжевый' },
              ]}
            />
            <Select
              className="ss"
              defaultValue="Все группы"
              style={{ width: 120 }}
              onChange={handleChangeFriends}
              options={[
                { value: 'Все', label: 'Все группы' },
                { value: 'Есть друзья', label: 'Есть друзья' },
                { value: 'Нет друзей', label: 'Нет друзей' },
              ]}
            />
          </Space>
        </div>

        {group?.map((item: Group) => (
          <OneGroup key={item.id} item={item} showFriend={showFriend} showFriends={showFriends} />
        ))}
      </div>
      {isLoading && <div className='zagr'>
        {/* <Spin />
        <div>Загрузка...</div> */}
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
      </div>}
      {isError || (data?.result === 0 && <div>Произошла ошибка</div>)}
      {data?.length === 0 && <div>
        <Empty description={false} />
        <div className='textNot'>Ничего не найдено</div>
        </div>}
    </>
  );
}

export default Groups;
