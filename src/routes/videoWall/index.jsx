import React from 'react';
import PageTop from '../../components/pageTop';

export default class VideoWall extends React.Component {
    render() {
        return(
            <React.Fragment>
                <PageTop current='电视墙' history={this.props.history} />
                 <div>电视墙页面</div>
            </React.Fragment>
        )
    }
}