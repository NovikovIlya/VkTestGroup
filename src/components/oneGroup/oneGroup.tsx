import { Button, Card } from 'antd';
import React from 'react';
import { User } from '../../types/types';

const oneGroup = ({ item, showFriend, showFriends }:any) => {
  return (
    <div className="container" key={item.id}>
      <div className="miniCont">
        <div className="imageBox" style={{ backgroundColor: item.avatar_color }}></div>
      </div>
      <Card className="cardd" title={item.name}>
        <p>Статус группы: {item.closed ? 'Закрытая' : 'Открытая'}</p>
        <p>Количество участников : {item.members_count}</p>
        {item?.friends?.length !== undefined && item?.friends?.length > 0 && (
          <>
            <Button onClick={() => showFriends(item.id)} type="primary">
              Количество друзей: {item?.friends?.length}
            </Button>
            {showFriend.includes(item.id) &&
              item?.friends?.map((item: User, index:number) => {
                return (
                  <div key={index}>
                    <span className="text">
                      {item.first_name} {item.last_name}
                    </span>
                  </div>
                );
              })}
          </>
        )}
      </Card>
    </div>
  );
};

export default oneGroup;
