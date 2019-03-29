import React, { Component } from 'react';
import './App.css';
import NoteForm from './component/NoteForm';
import NoteControl from './component/NoteControl';
import NoteList from './component/NoteList';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes : [],
      isDislayForm : false,
      noteEdit : null,
      filter : {
        title : "",
        desc :"",
        status: -1
      },
      keyword : "",
      sort : {
        by : "name",
        value : 1
      }
    }
  }

  
  componentWillMount() {
    // kiểm xa xem localStorage có dữ liệu và get đc dữ liệu từ key là notes k ? Có thì parse cái getItem thành obj
    // và gán lại state để khi load component thì state dữ luôn giá trị của Storage
    if(localStorage && localStorage.getItem('notes')){
      var notes = JSON.parse(localStorage.getItem('notes'))
      this.setState({
        notes
      })
    }
  }
  

  onGenerateData = () => {
    var notes = [
      {
          id : this.generateId() ,
          title : 'Tiêu đề 1',
          desc : 'Hôm nay học React',
          status : true,
      },
      {
        id : this.generateId() ,
        title : 'Tiêu đề 2',
        desc : 'Ngày mai học hoàn thành React',
        status : false,
      },
      {
        id : this.generateId() ,
        title : 'Tiêu đề 3',
        desc : 'Hôm nay học Redux',
        status : false,
      }
    ];
    this.setState({
      notes
    })
    localStorage.setItem('notes', JSON.stringify(notes)) // lưu dữ liệu vào localStorage bằng kiểu string
    // muốn sử dụng cần parse lại thành kiểu obj
  }

  s4() {
    return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
  }
  generateId() {
    return this.s4() + this.s4() + this.s4() + '-' + this.s4() + this.s4() + '-' + this.s4()
  }
  
  AddNote = () => {
    if(this.state.isDislayForm && this.state.noteEdit !== null){
      this.setState({
        noteEdit : null,
        isDislayForm : true
        
      })
    }else {
      this.setState({
        isDislayForm : !this.state.isDislayForm,
        noteEdit : null
      })
    }
    
  }
  onCloseForm = () => {
    this.setState({
      isDislayForm : false
    })
  }
  onShowForm = () => {
    this.setState({
      isDislayForm : true
    })
  }
  onSubmit = (data) => {
    var {notes} = this.state;
    if(data.id === ''){
      data.id = this.generateId();
      notes.push(data)
    } else {
      //Edit
      var index = this.findIndex(data.id)
      notes[index] = data
    }
    this.setState({
      notes,
      noteEdit : null
    })
    localStorage.setItem('notes', JSON.stringify(notes))
  }
  onUpdateStatus = (id) => {
    var {notes} = this.state;
    notes.map(notes => {
      if(notes.id === id){
          notes.status = !notes.status
      }
      return notes;
    })
    this.setState({
      notes
    })
    localStorage.setItem('notes', JSON.stringify(notes))
  }

  onDelete = (id) => {
    var {notes} = this.state;
    var index = this.findIndex(id)
      if(index !== -1){
          notes.splice(index,1)
          this.setState({
            notes
          })
          localStorage.setItem('notes', JSON.stringify(notes))
          this.onCloseForm();
      }
      return notes;
  }
  
  findIndex = (id) => {
    var {notes} = this.state;
    var result = -1
    notes = notes.map((notes,index) => {
      if(notes.id === id)
      {
        result = index;
      }
      return result;
    })
    return result;
  }

  onUpdate = (id) => {
    var {notes} = this.state;
    var index = this.findIndex(id)
    // var noteEdit = notes[index];
    this.setState({
      noteEdit : notes[index]
    }, () => { console.log(this.state.noteEdit)})
    this.onShowForm()
  }

  onFilter = (filterName,filterDesc, filterStatus) => {
      filterStatus = parseInt(filterStatus,10)
      this.setState({
        filter : {
          title : filterName.toLowerCase(),
          desc : filterDesc.toLowerCase(),
          status : filterStatus
        }
      })
  }
  onSearch = (keyword) => {
    this.setState({
      keyword
    })
  }
  onSort = (sort) => {
    this.setState({
      sort
    }, () =>{console.log(sort)})
  }
  render() {
    var {notes, isDislayForm, noteEdit, filter, keyword, sort} = this.state
    // Lọc danh sách trên table NoteList
    if(filter){
      if(filter.title){
        notes = notes.filter((notes) => {
          return notes.title.toLowerCase().indexOf(filter.title.toLocaleLowerCase()) !== -1;
        })
      }
      if(filter.desc)
      {
        notes = notes.filter((notes) => {
          return notes.desc.toLowerCase().indexOf(filter.desc.toLocaleLowerCase()) !== -1;
        })
      }
      notes = notes.filter((notes) => {
        if(filter.status === -1){
          return notes
        }else {
          return notes.status === (filter.status === 1 ? true : false)
        }
      })
    }
    // Search có nút bấm
    if(keyword){
      notes = notes.filter((notes) => {
        return notes.title.toLowerCase().indexOf(keyword.toLocaleLowerCase()) !== -1;
      })
    }
    // Sắp xếp
    if(sort.by === 'name'){
      notes.sort((a,b) => {
        if(a.title > b.title) return sort.value;
        else if(a.title < b.title) return -sort.value;
        else return 0;
      })
    } else {
        notes.sort((a,b) => {
          if(a.status > b.status) return -sort.value;
          else if(a.status < b.status) return sort.value;
          else return 0;
        })
    }
    return (
      <div className="container">
      <div className="text-center">
        <h1>Quản Lý Ghi Chú</h1>
        <hr />
      </div>
      <div className="row">
        {
          isDislayForm ? <NoteForm onCloseForm={this.onCloseForm} onSubmit={this.onSubmit} noteEdit={noteEdit}/> : ''
        }
        <div className={isDislayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
          <button type="button" className="btn btn-primary" onClick={() => this.AddNote()}>
            <span className="fa fa-plus mr-2" />Thêm Ghi Chú
          </button>
          <button type="button" className="btn btn-danger ml-2"
            onClick={() => this.onGenerateData()}
          >
            Thêm Dữ liệu
          </button>
          <NoteControl 
          onSearch={this.onSearch}
          onSort={this.onSort}
          />

          <NoteList 
          notes={notes} 
          onUpdateStatus={this.onUpdateStatus} 
          onDelete={this.onDelete} 
          onUpdate={this.onUpdate}
          onFilter={this.onFilter}
          />
        </div>
      </div>
    </div>
    );
  }
}

export default App;
