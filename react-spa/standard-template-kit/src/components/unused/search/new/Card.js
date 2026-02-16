import styled from "styled-components"

const CardStyle = styled.div`
  width: 300px;
  margin: 10px;
  border: 1px solid black;
  border-radius: 4px;
  padding: 10px;
  h {
    font-size: 18px;
  }
`

const Keywords = styled.ul`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  list-style: none;
  li {
    padding: 5px;
    background-color: yellowgreen;
    cursor: pointer;
  }
`
const Card = ({ fields: { title, description, keywords, uploadDate, lastUpdatedTime, id } }) => {
  return (
    <CardStyle>
      <div></div>
      {/* <img src={src} alt={title} /> */}
      <h1>{title}</h1>
      {description && <p>DESC: {description}</p>}
      <p>Asset ID: {id}</p>
      <p>Upload Date: {uploadDate}</p>
      <p>Last change: {lastUpdatedTime}</p>
      {keywords && (
        <Keywords>
          {keywords?.map(keyword => <li key={keyword} >{keyword}</li>)}
        </Keywords>
      )}
    </CardStyle>
  )
}

export default Card