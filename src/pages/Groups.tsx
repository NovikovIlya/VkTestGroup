import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import type { CollapseProps } from 'antd';
import { Select, Space, Card, Collapse, Popover ,Button} from 'antd';
import  './Group.css'
import {DownOutlined} from '@ant-design/icons';

function Groups() {
  // Data
  const [friends, setFriends] = useState('');
  const [isClosed, setIsClosed] = useState('');
  const [color, setColor] = useState('');
  const [unFriend, setunFriend] = useState(false);
  const [group, setGroup] = useState([]);
  // const [cat, setCat] = useState();

  // Hooks
  const { refetch, isPending, isError, data } = useQuery({
    queryKey: ['todos', friends, color, isClosed],
    queryFn: () => getTodos(friends, color, isClosed, unFriend),
  });

  const getTodos = async (
    param: any,
    color: any,
    isClosed: any,
    unFriend: any
  ) => {
    const res = await fetch(
      `https://78b9877e282ef0f7.mokky.dev/all?${color}${isClosed}&${friends}`
    );
    const data = await res.json();

    return data;
  };

  //// Фильтруем группы в случае если выбирается "без друзей"
  useEffect(() => {
    // getCats();
    if (unFriend) {
      setGroup(data.filter((item: any) => !item.friends));
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

  // const getCats = async () => {
  //   try {
  //     const res = await fetch(
  //       `https://api.thecatapi.com/v1/images/search?limit=15`,
  //       {
  //         headers: {
  //           'x-api-key':
  //             'live_CcWRuj2DUaa6ga7yc4ES8AzrKPNfrIKIqR4wLxCvlaUDuaDk1SZMi9sXsB24zrPJ',
  //         },
  //       }
  //     );
  //     const dataCat = await res.json();
  //     setCat(dataCat);
  //     console.log(dataCat);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //   }
  // };

  return (
    <>
      <div>
        <Space wrap>
          <Select
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

        {group?.map((item: any) => (
          <div key={item.id}>
            <Card className='cardd' title={item.name} style={{ width: 300 }}>
              <p>Статус группы: {item.closed ? "Закрытая" : "Открытая"}</p>
              
              {item?.friends?.length > 0 && (
              <Popover content={
                item?.friends?.map((item) => {
                  return (
                    <>

                    <div>
                      <span className='text'>{item.first_name} {item.last_name}</span>
                    </div>
                    </>
                  );
                })
                } title={ <div>Количество друзей: {item?.friends?.length}</div>}>
                <Button className='btnPop' type="primary">Посмотреть друзей<DownOutlined /></Button>
              </Popover>
              )}
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}

export default Groups;
