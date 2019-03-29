import React, { Component } from 'react';
import NoteItem from './NoteItem'

class NoteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName : "",
      filterDesc : "",
      filterStatus : -1 // Tất là là -1. hoàn thành 1 , chưa hoàn thành 0
    }
  }
  onChange = (event) => {
    var target = event.target
    var name = target.name
    var value = target.value
    this.props.onFilter(
      name === "filterName" ? value : this.state.filterName,
      name === "filterDesc" ? value : this.state.filterDesc,
      name === "filterStatus" ? value : this.state.filterStatus
    )
    this.setState({
      [name] : value
    })
  }
  
    render() {
        var {notes} = this.props // tương đương var notes = this.props.notes
        var { filterName, filterStatus, filterDesc } = this.state
        var elementNote = notes.map((notes, index) => {
            return <NoteItem
                key={notes.id}
                index={index}
                notes={notes}
                onUpdateStatus={this.props.onUpdateStatus}
                onDelete={this.props.onDelete}
                onUpdate={this.props.onUpdate}
            />
        });
        return (
            <div className="row mt-3">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <table className="table table-bordered table-hover">
                      <thead>
                        <tr>
                          <th className="text-center">STT</th>
                          <th className="text-center">Tiêu đề</th>
                          <th className="text-center">Nội dung</th>
                          <th className="text-center">Trạng Thái</th>
                          <th className="text-center">Hành Động</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td />
                          <td>
                            <input 
                            type="text" 
                            className="form-control" 
                            name="filterName" 
                            placeholder="...Nhập tiêu đề cần tìm"
                            value={filterName}
                            onChange={this.onChange}
                            />
                          </td>
                          <td>
                          <input 
                            type="text" 
                            className="form-control" 
                            name="filterDesc" 
                            placeholder="...Nhập nội dung cần tìm"
                            value={filterDesc}
                            onChange={this.onChange}
                            />
                          </td>
                          <td>
                            <select className="form-control" name="filterStatus" value={filterStatus} onChange={this.onChange}>
                              <option value={-1}>Tất Cả</option>
                              <option value={0}>Chưa Hoàn Thành</option>
                              <option value={1}>Hoàn Thành</option>
                            </select>
                          </td>
                          <td />
                        </tr>
                            { elementNote }
                        </tbody>
                    </table>
                  </div>
                </div>
        );
    }
}

export default NoteList;