import React, { Component } from 'react';

class NoteItem extends Component {
  
    onUpdateStatus = () => {
      // console.log(this.props.notes.id);
      this.props.onUpdateStatus(this.props.notes.id)
    }
    onDelete = () => {
      this.props.onDelete(this.props.notes.id)
    }
    onUpdate = () => {
      this.props.onUpdate(this.props.notes.id)
    }
    render() {
      var {notes,index} = this.props
        return (
            <tr>
                          <td className="text-center">{index + 1}</td>
                          <td className="text-center">{notes.title}</td>
                          <td className="text-center">{notes.desc}</td>
                          <td className="text-center">
                            {
                              notes.status === true ?
                              <span className="badge badge-pill badge-success" onClick={this.onUpdateStatus}>
                                Hoàn thành
                              </span>
                              :
                              <span className="badge badge-pill badge-danger" onClick={this.onUpdateStatus}>
                                Chưa hoàn thành
                              </span>
                            }
                            
                          </td>
                          <td className="text-center">
                            <button type="button" className="btn btn-warning mt-1" onClick={this.onUpdate}>
                              <span className="fas fa-edit mr-2" />Sửa
                            </button>
                            &nbsp;
                            <button type="button" className="btn btn-danger mt-1" onClick={this.onDelete}>
                              <span className="fa fa-trash mr-2" />Xóa
                            </button>
                          </td>
                        </tr>
                      
        );
    }
}

export default NoteItem;