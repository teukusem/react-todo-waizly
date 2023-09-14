import { useEffect } from 'react';
import {  Modal,Form, Input,Button,DatePicker } from 'antd';

import { stringToFormatDate } from '../../utils/date';

// eslint-disable-next-line 
const ModalComponent = ({form,isModalOpen,onFinish,onCancel,handleAddEdit,dataEdit}) => {

    const isEdit = (dataEdit) => {
        form.setFieldsValue({
            title_todo: dataEdit?.title,
            notes_todo: dataEdit?.notes,
            dates_todo : stringToFormatDate(dataEdit?.date)
        })
    }

    useEffect(() => {
        if(handleAddEdit === 'Edit') return isEdit(dataEdit)
        return form.resetFields();
    },[dataEdit,handleAddEdit])


    return (
        <Modal title={`${handleAddEdit} To Do List`} open={isModalOpen} onCancel={onCancel} footer={null}>
            <Form
                form={form}
                layout='vertical'
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                label="Title To Do"
                name="title_todo"
                rules={[
                    {
                    required: true,
                    message: 'Please input your TODO!',
                    },
                ]}
                >
                <Input  placeholder="Input your title"/>
                </Form.Item>

                <Form.Item
                label="Dates"
                name="dates_todo"
                >
                    <DatePicker disabled={handleAddEdit === 'Edit' ? true : false} style={{width: '100%'}} format={'DD-MM-YYYY'}/>
                </Form.Item>

                <Form.Item
                label="Notes"
                name="notes_todo"
                >
                    <Input.TextArea placeholder="Input your notes for todo"/>
                </Form.Item>

                <Form.Item style={{justifyContent: 'end', display:'flex'}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModalComponent