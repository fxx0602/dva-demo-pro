import React from 'react';
import PageTop from '../../components/pageTop';

export default class SystemLog extends React.Component {
    render() {
        return(
            <React.Fragment>
                  <PageTop current='系统日志' history={this.props.history} />
                  <div>系统日志页面</div>
            </React.Fragment>
          
        )
    }
}