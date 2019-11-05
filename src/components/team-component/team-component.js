import React, { Component } from "react";
import initialState from "../../state";
import "./team-component.css";

class TeamComponent extends Component {
  constructor(props) {
    super(props);
    const team = this.props.team;
    this.teamIndex = this.props.teamIndex;
    this.inputValue = initialState.inputValue;
    this.state = {
      team: team,
      inputValue: this.inputValue
    };
    this.addChannel = this.addChannel.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.removeChannel = this.removeChannel.bind(this);
    this.formValidation = this.formValidation.bind(this);
  }

  formValidation() {
    const { inputValue } = this.state;
    return isNaN(inputValue);
  }

  onChangeInput({ target }) {
    this.setState({ inputValue: target.value });
  }

  removeChannel(index) {
    this.setState(({ team }) => {
      team.channels.splice(index, 1);
      return [team];
    });
  }

  addChannel() {
    const { inputValue, team } = this.state;
    if (this.formValidation) {
      team.channels = team.channels || [];
      const { channels } = team;
      const index =
        channels.length > 0 ? channels[channels.length - 1].index + 1 : 1;
      channels.push({ name: inputValue, index: index });
      this.setState({ team, inputValue: this.inputValue });
    }
  }

  render() {
    const { team, inputValue } = this.state;
    return (
      <div>
        {team && (
          <div>
            <span className="team-name">{team.name}</span>
            <span className="add-channel">
              <input
                placeholder="Channel name"
                onChange={this.onChangeInput}
                value={inputValue}
              />
              <button onClick={this.addChannel} disabled={!isNaN(inputValue)}>
                &#8853;
            </button>
            </span>
          </div>
        )}
        {team && (
          <ul className="one">
            {team.channels &&
              team.channels.map((channel, idx) => (
                <li className="channel-name" key={channel.index}>
                  <span>{channel.name}</span>
                  <button onClick={() => this.removeChannel(idx)}>&#8854;</button>
                </li>
              ))}
          </ul>
        )}
      </div>
    );
  }
}

export default TeamComponent;
