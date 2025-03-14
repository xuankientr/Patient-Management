import { Input, Button } from 'antd';
import {
  SearchOutlined,
  TableOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';

const PatientSearch = ({
  searchText,
  handleSearchInputChange,
  viewMode,
  setViewMode,
  isSearching,
}) => {
  return (
    <div className='flex justify-between items-center mb-4'>
      <Input
        placeholder='Search patients...'
        prefix={<SearchOutlined />}
        value={searchText}
        onChange={handleSearchInputChange}
        className='w-64'
        allowClear
        loading={isSearching}
      />
      <div className='flex'>
        <Button
          type={viewMode === 'table' ? 'primary' : 'default'}
          icon={<TableOutlined />}
          onClick={() => setViewMode('table')}
        />
        <Button
          type={viewMode === 'grid' ? 'primary' : 'default'}
          icon={<AppstoreOutlined />}
          onClick={() => setViewMode('grid')}
        />
      </div>
    </div>
  );
};

export default PatientSearch;
