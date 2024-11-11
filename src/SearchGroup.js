import { useEffect, useState } from 'react'
import { Card, Flex, Input, Tabs } from 'antd'

const { Search } = Input

// const onTabClick = (key, label) => {
//   console.log(`Tab chosen: `, key)
// }
// function SearchBar() {
//   return (
//   <Search
//     placeholder='Example query: asian savory food'
//     onSearch={onSearch}
//     style={{
//       width: 200
//     }}
//   />
//   )
// }
const items = [
  {
    key: '1',
    label: 'Search',
    children: 'Search for a recipe without having to use the precise words'
  },
  {
    key: '2',
    label: 'Ask',
    children: 'Ask questions that goes beyond recipe search'
  }
]

const placeholderDict = {
  'search': 'e.g. savory asian dish',
  'ask': 'e.g. what dish uses the most meat'
}

function SearchGroup() {
  const [currentTabKey, setTabKey] = useState('1')
  const [placeholderText, setPlaceholderText] = useState(placeholderDict['search'])
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [query, setQuery] = useState('')
  useEffect(() => {
    if (!loading || query === '') return
    const selectedFeature = items.find(item => item.key === currentTabKey).label.toLowerCase()
    console.log({ selectedFeature })
    const jsonBody = JSON.stringify({
      query
    })
    console.log(jsonBody)
    const baseUrl = process.env.NODE_ENV === "development" ? "http://localhost:4000" : "https://sedate-jungle-chips.glitch.me"
    fetch(`${baseUrl}/${selectedFeature}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: jsonBody
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setResults(data)
    })
    .catch(error => {
      console.error(error)
    })
    .finally(() => {
      setQuery('')
      setLoading(false)
    })
  }, [currentTabKey, loading, query, results])
  function onTabClick(clickedKey) {
    console.log(`Tab key selected: `, clickedKey)
    if (currentTabKey !== clickedKey) {
      setTabKey(clickedKey)
      const selectedFeature = items.find(item => item.key === clickedKey).label.toLowerCase()
      setPlaceholderText(placeholderDict[selectedFeature])
    }
  }
  function onSearch(value, _e, info) {
    console.log({ value })
    console.log({ currentTabKey })
    // const selectedFeature = items.find(item => item.key === currentTabKey).label.toLowerCase()
    // console.log({ selectedFeature })
    // const jsonBody = JSON.stringify({
    //   feature: selectedFeature,
    //   query: value
    // })
    // console.log(jsonBody)
    setLoading(true)
    setQuery(value)
}
  function renderResults() {
    if (currentTabKey === "1") {
      return (
        <Flex wrap gap="large">
          {results.map(result => {
            const chunk = result.chunk.split(/:(.*)/s)
            return <Card title={chunk[0]} style={{ width: 300 }}><p>{chunk[1]}</p></Card> 
          })}
        </Flex>
      )
    }
    return results.map((result, index) => <p key={index}>{result.generate_rag_response}</p>)
  }
    return (
      <>
      <Tabs 
        style={{ marginBottom: '1rem' }} 
        defaultActiveKey='1' items={items}  
        onChange={onTabClick}
      />
      <Search
        allowClear
        loading={loading}
        onSearch={onSearch}
        placeholder={placeholderText}
        style={{
          marginBottom: '2rem',
          maxWidth: '480px'
        }}
      />
      {results.length > 0 ? (
        <div>{renderResults()}</div>
      ) : <div></div>}
      </>
    )
}
export default SearchGroup