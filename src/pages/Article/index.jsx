import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Table, Space, Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import locale from "antd/es/date-picker/locale/zh_CN";
import { http } from '../../utils'
import img404 from '../../assets/bg.png'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
  // 路由导航
  const navigate = useNavigate()
  // 频道列表管理
  const [channelList, setChannelList] = useState([])
  // 文章列表管理
  const [articleData, setArticleData] = useState({
    list: [],
    count: 0
  })
  // 文章参数管理
  const [params, setParams] = useState({
    page: 1,
    per_page: 10
  })

  // 获取频道管理的数据
  const loadChannelList = async () => {
    const res = await http.get('/channels')
    setChannelList(res.data.channels)
  }

  useEffect(() => {
    loadChannelList()
  }, [])
  useEffect(() => {
    // 获取文章列表数据
    const loadList = async () => {
      const res =await http.get('/mp/articles', {params})
      const { result, total_count } = res.data
      setArticleData({
        list: result,
        count: total_count
      })
    }
    loadList()
  }, [params])
  return (
    <div>
      {/* 筛选区域 */}
      <Card
        title={
          <Breadcrumb
            separator='>'
            items={[
              {title:<Link to="/layout/home">首页</Link>},
              {title:'内容管理'}
            ]}
          />
        }
        style={{ marginBottom: 20 }}
      >
        <Form
          onFinish={onFinish}
          initialValues={{ status: '' }}
        >
          <Form.Item
            label='状态'
            name='status'
          >
            {/* <Radio */}
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Article