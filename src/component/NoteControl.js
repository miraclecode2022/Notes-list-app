import React, { Component } from 'react';
import NoteSearchControl from './NoteSearchControl';
import NoteSortControl from './NoteSortControl';

class NoteControl extends Component {
    render() {
        return (
            <div className="row mt-3">
                <NoteSearchControl onSearch={this.props.onSearch}/>
                <NoteSortControl onSort={this.props.onSort}/>
            </div>   
        );
    }
}

export default NoteControl;