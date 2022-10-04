import React from 'react';
import axios from 'axios';

import ProductInfo from './ProductInfo.jsx';
import RatingInfo from './RatingInfo.jsx';
import StylesSection from './StylesSection.jsx';
import Description from './Description.jsx';

import calculateRating from '../../helpers.js';
import "./Overview.scss";

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      salePrice: '',
      styles: [],
      selectedStyle: {}
    }
  }

  getRating() {
    axios.post('/review', {id: this.props.product.id})
      .then((res) => {
        const rating = calculateRating(res.data.results);
        this.setState({rating});
      })
  }

  getStyles() {
    axios.get(`/products/${this.props.product.id}/styles`)
      .then(res => {
        console.log('Styles:', res.data.results)
        var selectedStyle = {};
        for (var style of res.data.results) {
          if (style['default?']) {
            selectedStyle = style;
            break;
          }
        }
        this.setState({
          styles: res.data.results,
          selectedStyle,
          salePrice: selectedStyle.sale_price || ''
        })
      })
  }

  selectStyle(selectedStyle) {
    var salePrice = selectedStyle.sale_price || '';
    this.setState({selectedStyle, salePrice})
  }

  componentDidMount() {
    this.getRating();
    this.getStyles();
  }

  render() {
    const {name, category, slogan, description, default_price} = this.props.product;
    return (
      <div>
        <h2>This is for Overview</h2>
        {(this.state.rating !== 0) && <RatingInfo rating={this.state.rating} handleScrollToReviews={this.props.handleScrollToReviews} />}
        <ProductInfo name={name} category={category} originalPrice={default_price} salePrice={this.state.salePrice} />
        {this.state.styles.length !== 0 && <StylesSection styles={this.state.styles} selectedStyle={this.state.selectedStyle} selectStyle={this.selectStyle.bind(this)} />}
        <Description slogan={slogan} description={description} />
      </div>
    )
  }
}

export default Overview;