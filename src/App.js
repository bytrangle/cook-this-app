import logo from './logo.svg';
import { useEffect } from 'react';
import { Flex, Layout } from 'antd'
import SearchGroup from './SearchGroup'
import './App.css';

const { Content } = Layout

const layoutStyle = {
  backgroundColor: 'inherit',
  height: '100vh'
}

const contentStyle = {
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: '720px'
}
function App() {
  useEffect(() => {
    document.title = 'Cook This App'
  }, [])
  return (
    <Flex gap="middle" wrap>
      <Layout style={layoutStyle}>
        <Content style={contentStyle}>
          <h1>Cook This App</h1>
          <p style={{
            fontSize: '1.25rem',
            margin: '0 0 1rem 0'
          }}>
            A little AI tool that allows you to search for recipes based on <em>your intention</em>.
          </p>
          <SearchGroup />
        </Content>
      </Layout>
    </Flex>
  );
}

export default App;
