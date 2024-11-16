import React, {useState} from 'react';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    Button,
    useColorScheme,
    View,
  } from 'react-native';

  const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

  function jsonDateReviver(key, value) {
    if (dateRegex.test(value)) return new Date(value);
    return value;
  }

  async function graphQLFetch(query, variables = {}) {
    try {
        /****** Q4: Start Coding here. State the correct IP/port******/
        const response = await fetch('http://10.0.2.2:3000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query, variables })
        /****** Q4: Code Ends here******/
      });
      const body = await response.text();
      const result = JSON.parse(body, jsonDateReviver);
  
      if (result.errors) {
        const error = result.errors[0];
        if (error.extensions.code == 'BAD_USER_INPUT') {
          const details = error.extensions.exception.errors.join('\n ');
          alert(`${error.message}:\n ${details}`);
        } else {
          alert(`${error.extensions.code}: ${error.message}`);
        }
      }
      return result.data;
    } catch (e) {
      alert(`Error in sending data to server: ${e.message}`);
    }
  }

class IssueFilter extends React.Component {
    render() {
      return (
        <>
        {/****** Q1: Start Coding here. ******/}
        <View>
          <Text>This is dummy Issue Filter Component</Text>
        </View>
        {/****** Q1: Code ends here ******/}
        </>
      );
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    card: { 
        backgroundColor: '#f9f9f9', 
        padding: 20, 
        marginVertical: 10, 
        borderRadius: 10, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.1, 
        shadowRadius: 5, 
        elevation: 3 
    },
    cardTitle: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        marginBottom: 10 
    },
    header: { height: 50, backgroundColor: '#537791' },
    text: { textAlign: 'center' },
    dataWrapper: { marginTop: -1 },
    row: { height: 40, backgroundColor: '#E7E6E1' }
});

const width= [40,80,80,80,80,80,200];

function IssueRow(props) {
    const issue = props.issue;
    {/****** Q2: Coding Starts here. Create a row of data in a variable******/}
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{issue.title}</Text>
        <Text>Status: {issue.status}</Text>
        <Text>Owner: {issue.owner}</Text>
        <Text>Created: {issue.created.toDateString()}</Text>
        <Text>Effort: {issue.effort}</Text>
        <Text>Due: {issue.due ? issue.due.toDateString() : 'N/A'}</Text>
      </View>
    );
    {/****** Q2: Coding Ends here.******/}
}
  
  
function IssueTable(props) {
    const issueRows = props.issues.map(issue =>
      <IssueRow key={issue.id} issue={issue} />
    );

    return (
      <ScrollView style={styles.container}>
        {issueRows}
      </ScrollView>
    );
}
  
class IssueAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    /****** Q3: Start Coding here. Create State to hold inputs******/
    this.state = {
      title: '',
      owner: '',
      effort: '',
      due: '',
    };
    /****** Q3: Code Ends here. ******/
  }

  /****** Q3: Start Coding here. Add functions to hold/set state input based on changes in TextInput******/
  handleTitleChange = (text) => {
    this.setState({ title: text });
  };

  handleOwnerChange = (text) => {
    this.setState({ owner: text });
  };

  handleEffortChange = (text) => {
    this.setState({ effort: text });
  };

  handleDueChange = (text) => {
    this.setState({ due: text });
  };
  /****** Q3: Code Ends here. ******/
  
  handleSubmit() {
    /****** Q3: Start Coding here. Create an issue from state variables and call createIssue. Also, clear input field in front-end******/
    const { title, owner, effort, due } = this.state;
    const issue = { title, owner, effort: parseInt(effort, 10), due: new Date(due) };
    this.props.createIssue(issue);
    this.setState({ title: '', owner: '', effort: '', due: '' });
    this.props.toggleForm();
    /****** Q3: Code Ends here. ******/
  }

  handleCancel() {
    /****** Q3: Start Coding here. Clear input fields and hide the form******/
    this.setState({ title: '', owner: '', effort: '', due: '' });
    this.props.toggleForm();
    /****** Q3: Code Ends here. ******/
  }

  render() {
    return (
      <View>
        {/****** Q3: Start Coding here. Create TextInput field, populate state variables. Create a submit button, and on submit, trigger handleSubmit. Create a cancel button to hide the form.*******/}
        <TextInput
          placeholder="Title"
          value={this.state.title}
          onChangeText={this.handleTitleChange}
        />
        <TextInput
          placeholder="Owner"
          value={this.state.owner}
          onChangeText={this.handleOwnerChange}
        />
        <TextInput
          placeholder="Effort"
          value={this.state.effort}
          onChangeText={this.handleEffortChange}
        />
        <TextInput
          placeholder="Due Date (YYYY-MM-DD)"
          value={this.state.due}
          onChangeText={this.handleDueChange}
        />
        <Button title="Add Issue" onPress={this.handleSubmit} />
        <Button title="Cancel" onPress={this.handleCancel} />
        {/****** Q3: Code Ends here. ******/}
      </View>
    );
  }
}

class BlackList extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        /****** Q4: Start Coding here. Create State to hold inputs******/
        this.state = {
          name: '',
        };
        /****** Q4: Code Ends here. ******/
    }
    /****** Q4: Start Coding here. Add functions to hold/set state input based on changes in TextInput******/
    handleNameChange = (text) => {
      this.setState({ name: text });
    };
    /****** Q4: Code Ends here. ******/

    async handleSubmit() {
    /****** Q4: Start Coding here. Create an issue from state variables and issue a query. Also, clear input field in front-end******/
      const { name } = this.state;
      const query = `mutation addToBlacklist($nameInput: String!) {
        addToBlacklist(nameInput: $nameInput)
      }`;
      await graphQLFetch(query, { nameInput: name });
      this.setState({ name: '' });
      this.props.toggleBlacklistForm();
    /****** Q4: Code Ends here. ******/
    }

    handleCancel() {
      /****** Q4: Start Coding here. Clear input fields and hide the form******/
      this.setState({ name: '' });
      this.props.toggleBlacklistForm();
      /****** Q4: Code Ends here. ******/
    }

    render() {
    return (
        <View>
        {/****** Q4: Start Coding here. Create TextInput field, populate state variables. Create a submit button, and on submit, trigger handleSubmit. Create a cancel button to hide the form.*******/}
        <TextInput
          placeholder="Name"
          value={this.state.name}
          onChangeText={this.handleNameChange}
        />
        <Button title="Add to Blacklist" onPress={this.handleSubmit} />
        <Button title="Cancel" onPress={this.handleCancel} />
        {/****** Q4: Code Ends here. ******/}
        </View>
    );
    }
}

export default class IssueList extends React.Component {
    constructor() {
        super();
        this.state = { issues: [], showForm: false, showBlacklistForm: false };
        this.createIssue = this.createIssue.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
        this.toggleBlacklistForm = this.toggleBlacklistForm.bind(this);
    }
    
    componentDidMount() {
    this.loadData();
    }

    async loadData() {
    const query = `query {
        issueList {
        id title status owner
        created effort due
        }
    }`;

    const data = await graphQLFetch(query);
    if (data) {
        this.setState({ issues: data.issueList });
    }
    }

    async createIssue(issue) {
    const query = `mutation issueAdd($issue: IssueInputs!) {
        issueAdd(issue: $issue) {
        id
        }
    }`;

    const data = await graphQLFetch(query, { issue });
    if (data) {
        this.loadData();
    }
    }

    toggleForm() {
      this.setState((prevState) => ({ showForm: !prevState.showForm }));
    }

    toggleBlacklistForm() {
      this.setState((prevState) => ({ showBlacklistForm: !prevState.showBlacklistForm }));
    }
    
    render() {
    return (
    <>
    {/****** Q1: Start Coding here. ******/}
    <IssueFilter />
    {/****** Q1: Code ends here ******/}

    {/****** Q2: Start Coding here. ******/}
    {/****** Q3: Start Coding here. ******/}
    {this.state.showForm ? (
      <IssueAdd createIssue={this.createIssue} toggleForm={this.toggleForm} />
    ) : (
      <>
        <Button title="Add New Issue" onPress={this.toggleForm} />
        <IssueTable issues={this.state.issues} />
      </>
    )}
    {/****** Q2: Code ends here ******/}
    {/****** Q3: Code Ends here. ******/}
    
    {/****** Q4: Start Coding here. ******/}
    {this.state.showBlacklistForm ? (
      <BlackList toggleBlacklistForm={this.toggleBlacklistForm} />
    ) : (
      <Button title="Blacklist User" onPress={this.toggleBlacklistForm} />
    )}
    {/****** Q4: Code Ends here. ******/}
    </>
      
    );
  }
}
