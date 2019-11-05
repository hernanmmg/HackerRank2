import React, { Component } from 'react';
import TeamComponent from '../team-component/team-component';
import './team-list.css';

class TeamList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      teams: [
        {
          name: 'Team1',
          channels: [
            {
              name: 'Channel1',
              index: 1
            },
            {
              name: 'Channel2',
              index: 2
            }
          ]
        },
        {
          name: 'Team2',
          channels: [
            {
              name: 'Channel1',
              index: 1
            },
            {
              name: 'Channel2',
              index: 2
            }
          ]
        }
      ]
    };
    this.addTeam = this.addTeam.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  formValidation() {
    const { inputValue } = this.state;
    return isNaN(inputValue);
  }

  addTeam() {
    this.setState(({ teams, inputValue }) => {
      if (this.formValidation(inputValue)) {
        const newTeam = { name: inputValue };
        return { teams: teams.concat(newTeam), inputValue: '' };
      }
    });
  }

  onChangeInput({ target }) {
    this.setState({ inputValue: target.value });
  }

  render() {
    const { teams, inputValue } = this.state;
    return [
      <div key="teams-list" className="teams-list">
        <ul>
          {teams &&
            teams.map((team, idx) => (
              <li key={idx}>
                <TeamComponent team={team} teamIndex={idx} />
              </li>
            ))}
        </ul>
      </div>,
      <div key="add-team" className="add-team">
        <b>Add Team</b>
        <input
          placeholder="Team name"
          value={inputValue}
          onChange={this.onChangeInput}
        />
        <button onClick={this.addTeam} disabled={!this.formValidation()}>
          &#8853;
        </button>
      </div>
    ];
  }
}

export default TeamList;
