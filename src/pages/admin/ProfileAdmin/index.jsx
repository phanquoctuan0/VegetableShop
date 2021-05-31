import { Tabs } from 'antd';


function ProfileAdminPage() {
  const { TabPane } = Tabs;
  return (
    <>
      <div className="card-container">
        <Tabs type="card">
          <TabPane tab="Thông tin tài khoản" key="1">
            <p>Content of Tab Pane 1</p>
            <p>Content of Tab Pane 1</p>
            <p>Content of Tab Pane 1</p>
          </TabPane>
          <TabPane tab="Thay đổi mật khẩu" key="2">
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
          </TabPane>
        </Tabs>
      </div>
    </>
  )
}

export default ProfileAdminPage;