var Skill = React.createClass({
  getInitialState() {
  return {editable: false}
  },

  onUpdate() {
    if (this.state.editable) {
      var skill   = { id: this.props.skill.id,
                      name: this.refs.name.value,
                      details: this.refs.details.value,
                      level: this.props.skill.level}

      this.props.handleUpdate(skill);
    }

    this.setState({editable: !this.state.editable})
  },

  handleLevelChange(action) {
    var levels  = ['bad', 'halfbad', 'fantastic'];
    var level   = levels.indexOf(this.props.skill.level);

    if (this.levelCanBeChanged(action, level)) {
      var skill = this.updatedSkill(action, level);
      this.props.handleUpdate(skill);
    }
  },

  levelCanBeChanged(action, limit) {
    return action === 'up' && limit < 2 || action === 'down' && limit > 0;
  },

  updatedSkill(action, index) {
    var id      = this.props.skill.id;
    var name    = this.props.skill.name;
    var details = this.props.skill.details;

    var newLevel = this.getNewLevel(action);

    return {id: id, name: name, details: details, level: newLevel}
  },

  getNewLevel(action) {
    var levels  = ['bad', 'halfbad', 'fantastic'];
    var index   = levels.indexOf(this.props.skill.level);
    var change  = action === 'up' ? 1 : -1;

    return levels[index + change];
  },





  render() {
    var name    = this.state.editable ? <input type='text'
                                               ref='name'
                                               defaultValue={this.props.skill.name}/>
                                      : <h3>{this.props.skill.name}</h3>

    var details = this.state.editable ? <textarea type='text'
                                                  ref='details'
                                                  defaultValue={this.props.skill.details}>
                                        </textarea>
                                      : <p>{this.props.skill.details}</p>
    return (
      <div>
        {name}
        <div className='skill-level'>
          <button type='button'
                  className="btn btn-default btn-sm"
                  onClick={this.handleLevelChange.bind(this, 'down')}>
            <span className="glyphicon glyphicon-triangle-bottom"></span>
          </button>
          <p><strong>Level:</strong> {this.props.skill.level}</p>
          <button type='button'
                  className="btn btn-default btn-sm"
                  onClick={this.handleLevelChange.bind(this, 'up')}>
            <span className="glyphicon glyphicon-triangle-top"></span>
          </button>
        </div>
        {details}

        <button onClick={this.props.handleDelete}>Delete</button>

        <button onClick={this.onUpdate}>{this.state.editable ? 'Submit' : "Edit"}</button>
      </div>
    )
  }
});
