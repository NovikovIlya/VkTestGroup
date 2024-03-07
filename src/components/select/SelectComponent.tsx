import { Select, Space } from 'antd';
import '../../pages/Group/Group.css';

const SelectComponent = ({ handleChangeClosed, handleChangeColor,handleChangeFriends }:any) => {
  return (
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
  );
};

export default SelectComponent;
