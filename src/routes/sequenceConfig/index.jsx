import React from 'react';
import PageTop from '../../components/pageTop';

export default class SequenceConfig extends React.Component {
    render() {
        return(
            <React.Fragment>
                  <PageTop current='序列配置' history={this.props.history} />
                  <div>序列配置页面</div>
            </React.Fragment>
           
        )
    }
}