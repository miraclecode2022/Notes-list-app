import React, { Component } from 'react';

class NoteForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        id : "",
        title : "",
        desc : "",
        status : false
      }
    }
    // componentWullMount chỉ chạy khi form này chưa đc hiển thị , còn khi hiển thị rồi thì sẽ k gọi nữa
    componentWillMount() {
      if(this.props.noteEdit != null){
        this.setState({
          id : this.props.noteEdit.id,
          title : this.props.noteEdit.title,  
          desc : this.props.noteEdit.desc,
          status : this.props.noteEdit.status
        })
      }
    }
    
    componentWillReceiveProps(nextProps) {
      if(nextProps && nextProps.noteEdit){
        this.setState({
          id : nextProps.noteEdit.id,
          title : nextProps.noteEdit.title,  
          desc : nextProps.noteEdit.desc,
          status : nextProps.noteEdit.status
        })
      }else if(!nextProps.noteEdit){
        this.setState({
          id : "",
          title : "",
          desc : "",
          status : false
        })
      }
    }
    
    onCloseForm = () => {
      this.props.onCloseForm();
    }
    
    onChange = (event) => {
      var target = event.target;
      var name = target.name;
      var value = target.value;
      if(name === 'status'){
        value = target.value === 'true' ? true : false
      }
      this.setState({
        [name] : value
      })
    }

    onSubmit= (event) => {
      event.preventDefault();
      this.props.onSubmit(this.state);
      this.onClear();
      this.onCloseForm();
    }
    onClear = () => {
      this.setState({
        title : "",
        desc : "",
        status : false
      })
    }

    render() {
      var {id} = this.state;
        return (
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <div className="card">
              <div className="card-header bg-warning">
                {id !== "" ? "Sửa Ghi Chú" : "Thêm Ghi Chú" } <span><i className="far fa-times-circle float-right mt-1 cursor-pointer" onClick={ this.onCloseForm}></i></span>
              </div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label>Tiêu đề :</label>
                    <input type="text" 
                    className="form-control" 
                    name="title" 
                    value={this.state.title}
                    onChange={(event) => this.onChange(event)}
                     />
                  </div>
                  <div className="form-group">
                    <label>Nội dung :</label>
                    <textarea type="text" 
                    className="form-control" 
                    name="desc" 
                    value={this.state.desc} 
                    onChange={(event) => this.onChange(event)}
                    />
                  </div>
                  <label>Trạng Thái :</label>
                  <select className="form-control" 
                  required="required" 
                  name="status" 
                  value={this.state.status}
                  onChange={(event) => this.onChange(event)}
                  >
                    <option value={false}>Chưa Hoàn Thành</option>
                    <option value={true}>Hoàn Thành</option>
                  </select>
                  <br />
                  <div className="text-center">
                    {
                      id !== "" ?
                      <button type="submit" className="btn btn-warning mr-2"><i className="fas fa-edit mr-2"></i>
                      Sửa
                      </button>
                      :
                      <button type="submit" className="btn btn-success mr-2"><i className="fas fa-plus-square mr-2"></i>
                      Thêm
                      </button>
                    }
                    <button
                    type="button" 
                    className="btn btn-danger"
                    onClick={this.onClear}
                    > <i className="fas fa-minus-circle mr-2"></i>Hủy Bỏ</button>
                  </div>
                </form>
              </div>
            </div>
        </div>
        
        );
    }
}

export default NoteForm;