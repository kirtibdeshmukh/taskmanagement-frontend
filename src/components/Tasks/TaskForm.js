import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { ModalBody, ModalFooter } from "reactstrap"
import NativeSelect from '@material-ui/core/NativeSelect';

export default class TaskForm extends React.Component {
 state = {
    title: "",
    titleError: "",
    description:"",
    priority:"Low",
    label:"",
    due_date:null,
    due_date_error:"",
  };
  onBlur = e => {
    e.target.value = e.target.value.trim()
    this.setState({
      [e.target.name]: e.target.value.trim()
    });
  }
  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  validate = () => {
    let isError = false;
    const errors = {
      titleError: "",
      due_date_error:"",
    };
    if(this.state.title.length <= 0) {
      isError = true;
      errors.titleError = "Task title not be empty"
    }
    
    if(Date.parse(this.state.due_date) < new Date()) {
      isError = true;
      errors.due_date_error = "Select valid due date"
    }

    this.setState({
      ...this.state,
      ...errors
    });
    return isError;
  };

  onSubmit = e => {
    e.preventDefault();
    const { callUpdateTask, callCreateTask, taskId} = this.props;

    console.log(this.state);
    const err = this.validate();
    if (!err) {
      
      if(taskId) {
        callUpdateTask(this.state);
      } else {
        callCreateTask(this.state);
      }
      // clear form
      this.setState({
        title: "",
        titleError: "",
        description:"",
        priority:"Low",
        label:"",
        due_date:null,
      });
    }
  };

  onCancel = e => {
    //TODO
    console.log("Cancelling the form");
  };
  
  
  render() {
    const { labels, statusList, priorities, toggleModal} = this.props;
    // console.log("=====", this.props)
    
    return (
      <div className="ml-3 mt-3 mb-3">
      <form>
        <ModalBody>
        <TextField
          error = {this.state.titleError.length > 0}
          name="title"
          hinttext="Title"
          label="Title"
          variant="outlined"
          style={ {width: '25ch'}}
          value={this.state.title}
          onBlur={e => this.onBlur(e)}
          onChange={e => this.change(e)}
          helperText={this.state.titleError}
          floatinglabelfixed
        />
        <br />
        <br/>
        <TextField
          name="description"
          hinttext="Description"
          label="Description"
          variant="outlined"
          style={ {width: '35ch'}}
          value={this.state.description}
          onBlur={e => this.onBlur(e)}
          onChange={e => this.change(e)}
          floatinglabelfixed
        />

       <br/>
       <br/>

        <TextField
        error = {this.state.due_date_error.length > 0}
        id="date"
        label="Due date"
        type="date"
        name="due_date"
        defaultValue={new Date()}
        onChange={e => this.change(e)}
        helperText={this.state.due_date_error}
        InputLabelProps={{
          shrink: true,
        }}
      />
        <br/>
      {/* <FormControl required >
        <InputLabel >Priority</InputLabel>
        <NativeSelect
        name="priority"
        value="Low"
        onChange={e => this.change(e)}
        inputProps={{
        name: 'priority',
        }}
        >
        <option value={"High"}>High</option>
        <option value={"Medium"}>Medium</option>
        <option value={"Low"}>Low</option>
        </NativeSelect>
        </FormControl> */}
       

      <br/>
       <br/>
      <FormControl >
        <InputLabel shrink>
        Label
        </InputLabel>
        <NativeSelect
        name="label"
        onChange={e => this.change(e)}
        inputProps={{
        name: 'label',
        }}
        >
          <option value="">None</option>
          {
            labels.map(label => {
              return  <option value={label.value}>{label.label}</option>
            })
          }
        </NativeSelect>
      </FormControl>
      </ModalBody>
        <br/>
        <br/>
        <ModalFooter>
        <Button variant="contained" 
        color="primary"
        className="mr-2"
        onClick={e => this.onSubmit(e)}>
        Save
        </Button>

        <Button variant="contained" 
        color="secondary"  
        paddingLeft = "15%"
        onClick= {toggleModal}>
        Cancel
        </Button>
        </ModalFooter>
      </form>
      </div>
    )
  }
  }
