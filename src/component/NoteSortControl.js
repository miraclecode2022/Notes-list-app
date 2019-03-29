import React, { Component } from 'react';

class NoteSortControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort : {
        by: "name",
        value : 1
      }
    }
  }
  
  onClick = (sortBy, sortValue) => {
    this.setState({
      sort : {
        by : sortBy,
        value : sortValue
      }
    }, () =>{this.props.onSort(this.state.sort)});
  } 
    render() {
        var {sort} = this.state
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div className="dropdown cursor-pointer">
                      <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Sắp Xếp
                      </button>
                      <ul className="dropdown-menu text-center" aria-labelledby="dropdownMenu1">
                        <li onClick={ () => this.onClick('name',1) }>
                          <a  role="button">
                            <span className="fas fa-sort-alpha-down pr-2"></span>
                            <span className="pr-2">Tên A-Z</span>
                            {
                              (sort.by === 'name' && sort.value === 1 ? <span> <i className="fa fa-check"></i> </span> : '')
                            }
                            
                          </a>
                        </li>
                        <li onClick={ () => this.onClick('name',-1) }>
                          <a  role="button">
                            <span className="fas fa-sort-alpha-up pr-2"></span>
                            <span>Tên Z-A</span>
                            {
                              (sort.by === 'name' && sort.value === -1 ? <span> <i className="fa fa-check"></i> </span> : '')
                            }
                          </a>
                        </li>
                        <li role="separator" className="dropdown-divider" />
                        <li onClick={ () => this.onClick('status',1) }>
                          <a role="button">Trạng Thái Hoàn Thành</a>
                          {
                              (sort.by === 'status' && sort.value === 1 ? <span> <i className="fa fa-check"></i> </span> : '')
                          }
                        </li>
                        <li onClick={ () => this.onClick('status',-1) }>
                          <a role="button">Trạng Thái Chưa Hoàn Thành</a>
                          {
                              (sort.by === 'status' && sort.value === -1 ? <span> <i className="fa fa-check"></i> </span> : '')
                          }
                        </li>
                      </ul>
                    </div>
            </div>
           
        );
    }
}

export default NoteSortControl;