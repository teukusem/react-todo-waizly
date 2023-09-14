import Lottie from 'react-lottie';
import { useEffect, useState } from 'react';
import { Typography, Row, Col ,Form, Input} from 'antd';

import { StyledCard } from './styled-component/styled';
import IconPlus from './assets/json/plus-icon.json'
import ModalComponent from './components/modal';

import './App.css'
import { dateToString } from './utils/date';
import { generateId } from './utils/functionGenerateId';


function App() {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataStorage,setDataStorage] = useState([])
  const [dataEdit,setDataEdit] = useState({})
  const [dataToDo, setDataToDo] = useState([])
  const [handleAddEdit,setHandleAddEdit] = useState('Add')
  const [search, setSearch] = useState("");

  const handleEditCard = data => {
    setHandleAddEdit('Edit')
    setDataEdit(data)
    setIsModalOpen(true)
  }

  const handleDeleteCard = (id) => {
    const updatedData = dataToDo.filter((item) => item.id !== id);
    setDataToDo(updatedData);
    localStorage.setItem('data', JSON.stringify(updatedData));
  };

  const handleAddCard = () => {
    setHandleAddEdit('Add')
    setIsModalOpen(true)
  }

  const handleDone = id => {
    const updatedDataStorage = dataStorage.map((item) =>
    item.id === id ? { ...item, done: !item.done } : item
  );
  setDataStorage(updatedDataStorage);
  localStorage.setItem('data', JSON.stringify(updatedDataStorage));
  }

  const onFinish = (values) => {
    const newItem = {
      id: generateId(),
      title: values?.title_todo,
      date: dateToString(values?.dates_todo),
      notes: values?.notes_todo,
      done: false
    };

    const updatedData = [...dataToDo, newItem];
    setDataToDo(updatedData);
    localStorage.setItem('data', JSON.stringify(updatedData));
    form.resetFields();
    setIsModalOpen(false);
  };

  const onEdit = (editedItem) => {
    const itemIndex = dataStorage.findIndex(item => item.id === dataEdit.id);

    if (itemIndex !== -1) {
      const updatedData = [...dataToDo];
      updatedData[itemIndex] = {
        ...updatedData[itemIndex],
        title: editedItem.title_todo,
        date: dateToString(editedItem.dates_todo),
        notes: editedItem.notes_todo,
      };
      setDataToDo(updatedData);
      localStorage.setItem('data', JSON.stringify(updatedData));
    }
    setIsModalOpen(false);
  };

  const onCancel = () => {
    setIsModalOpen(false)
  }


  useEffect(() => {
    setDataStorage(JSON.parse(localStorage.getItem('data')))
  }, [dataToDo]);


  const lootieOptions = {
    loop: true,
    autoplay: true,
    animationData: IconPlus,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };



  return (
    <>
    <Row justify={'space-between'}>
      <Col span={6}>
      <Title>To Do Wall List</Title>
      </Col>
      <Col span={6} style={{placeSelf:'center'}}>
        <Input placeholder="Search Here" 
          onChange={(event) => {
            setSearch(event.target.value);
          }}/>
      </Col>
    </Row>
      <Row gutter={10}>
        {dataStorage?.filter((item) => {
                if (search === "") {
                  return item;
                } else if (
                  item.title
                    .toLowerCase()
                    .includes(search.toLowerCase())
                ) {
                  return item;
                }
              })?.slice()?.reverse()?.map((todo,index) => 
                <Col span={6} key={index}>
                    <StyledCard done={todo?.done} color={todo?.done ? '#D3D3D3' :' #FDF2B3'} >
                      <div className='wrapper-child'>
                        <Title level={4}>{todo?.title}</Title>
                          <div style={{gap:20, display:'flex'}}>
                            <span className='title-edit' onClick={() => handleDone(todo.id)}>Done</span>
                            <span className='title-edit' onClick={() => handleEditCard(todo)}>Edit</span>
                            <span className='title-edit' onClick={() => handleDeleteCard(todo.id)}>Delete</span>
                          </div>
                        </div>
                        <div className='wrapper-child'>
                          <span className='title-notes'>Notes :</span>
                          <span className='title-date'>{todo?.date}</span>
                        </div>
                        <div className='title-notes'>
                          {todo?.notes}
                        </div>
                    </StyledCard>
                </Col>
        )}
        <Col span={6} >
          <StyledCard color='#EFEFEF'>
            <span onClick={handleAddCard}>
              <Lottie options={lootieOptions}/>
            </span>
          </StyledCard>
          </Col>
      </Row>

      <ModalComponent form={form} isModalOpen={isModalOpen} onCancel={onCancel} onFinish={handleAddEdit === 'Edit' ? onEdit : onFinish} handleAddEdit={handleAddEdit} dataEdit={dataEdit} />
    </>
  )
}

export default App
