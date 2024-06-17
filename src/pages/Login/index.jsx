import React from 'react';
// import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form, Input, Checkbox, message } from 'antd';
import bg from '../../assets/bg.png'
import './index.scss'
import useStore from '../../store';

// Form.Item的简写形式
const Item = Form.Item

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate()
  const { LoginStore } = useStore()
  // 获取表单数据
  const onFinish = async(values) => {
    console.log(values)
    const { mobile, code } = values
    try {
      // 登录
      await LoginStore.getToken({mobile,code})
      // 跳转首页
      navigate('/',{replace:true})
      // 提示用户登录成功
      message.success('登录成功')
    } catch (error) {
      message.error(error.response?.data.message || '登录失败')
    }
  }
  return (
    <div className='login'>
      <Card className='login-container'>
        <img src={bg} alt='背景图' className='login-logo' />
        {/* 登录表单 */}
        <Form ref={form} onFinish={onFinish}>
          <Item name='mobile'>
            <Input size='large' placeholder='请输入电话'></Input>
          </Item>
          <Item name='code'>
            <Input size='large' placeholder='请输入密码'></Input>
          </Item>
          <Item name='remember'>
            <Checkbox className='login-checkbox-label'>
              我已经阅读并同意【用户协议】和【隐私条款】
            </Checkbox>
          </Item>
          <Button type='primary' htmlType='submit' size='large' block onClick={onFinish}>登录</Button>
        </Form>
      </Card>
    </div>
  );
}

export default Login;