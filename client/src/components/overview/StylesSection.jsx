import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

import StyleCircle from './StyleCircle.jsx';

class StylesSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStyleId: this.props.selectedStyle.style_id,
      selectedStyleName: this.props.selectedStyle.name
    }
  }

  changeStyle(selectedStyle) {
    this.setState({
      selectedStyleId: selectedStyle.style_id,
      selectedStyleName: selectedStyle.name
    })
  }

  static getDerivedStateFromProps(props, state) {
    if (props.selectedStyle.style_id !== state.selectedStyleId && props.selectedStyle.name !== state.selectedStyleName) {
      return {
        selectedStyleId: props.selectedStyle.style_id,
        selectedStyleName: props.selectedStyle.name
      }
    }
    return null;
  }

  render() {
    console.log('Selected style: ', this.props.selectedStyle)
    return(
      <div className='styles-container'>
        <div className='closest-flex'>
          <span className='bold-text'>STYLE</span>
          <FontAwesomeIcon icon={faChevronRight} />
          <span className='style-name'>{this.state.selectedStyleName.toUpperCase()}</span>
        </div>
        <div className='style-list'>
          {this.props.styles.map(style => (
            <StyleCircle key={style.style_id}
              style={style}
              selectStyle={this.props.selectStyle}
              changeStyle={this.changeStyle.bind(this)}
              selected={this.state.selectedStyleId === style.style_id ? true : false} />
          ))}
        </div>
      </div>
    )
  }
}

export default StylesSection;