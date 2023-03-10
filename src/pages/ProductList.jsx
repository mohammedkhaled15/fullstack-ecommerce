import { useState, useRef } from "react"
import styled from "styled-components"
import Announcement from "../components/Announcement"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import NewsLetter from "../components/NewsLetter"
import Products from "../components/Products"
import { mobile } from "../responsive"
import { useLocation } from "react-router-dom"

const Container = styled.div``
const Title = styled.h1`
margin: 20px;
`
const FilterContainer = styled.div`
display: flex;
justify-content: space-between;
margin: 20px;
`
const Filter = styled.div`
  margin: 20px;
  ${mobile({ margin: "0px", display: "flex", flexDirection: "column" })}
`
const Button = styled.button`
  background-color: #177974;
  color:White;
  font-size: 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`

const FilterText = styled.span`
  font-style: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0" })}
`
const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`
const Option = styled.option``

const ProductList = () => {

  const location = useLocation()
  const cat = location.pathname.split("/")[2]

  const sizeRef = useRef()
  const colorRef = useRef()

  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState("newest")

  const handleSelectChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    })
  }
  const handleSortChange = (e) => {
    setSort(e.target.value)
  }
  const handleFilterReset = () => {
    setFilters({})
    colorRef.current.value = "Color"
    sizeRef.current.value = "Size"
  }
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{cat ? cat.toUpperCase() : "All Products"}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products</FilterText>
          <Select name="color" onChange={handleSelectChange} ref={colorRef}>
            <Option >
              Color
            </Option>
            <Option>white</Option>
            <Option>black</Option>
            <Option>red</Option>
            <Option>yellow</Option>
            <Option>blue</Option>
            <Option>pink</Option>
            <Option>green</Option>
          </Select>
          <Select name="size" onChange={handleSelectChange} ref={sizeRef}>
            <Option >
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Button onClick={handleFilterReset}>Reset</Button>
        <Filter>
          <FilterText>Sort Products</FilterText>
          <Select onChange={handleSortChange}>
            <Option value={"newest"}>Newest</Option>
            <Option value={"priceAsc"}>Price (asc)</Option>
            <Option value={"priceDesc"}>Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} />
      <NewsLetter />
      <Footer />
    </Container>
  )
}

export default ProductList