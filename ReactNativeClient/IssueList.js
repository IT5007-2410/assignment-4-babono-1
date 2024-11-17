import React, {useState} from 'react';

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
        <Button title="Filter" onPress={() => {}} color="#d7d7d7" />
        {/****** Q1: Code ends here ******/}
        </>
      );
    }
}

const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      padding: 16,       
      backgroundColor: '#fff' 
    },
    card: { 
      backgroundColor: '#f9f9f9', 
      padding: 16, 
      marginVertical: 8, 
      borderRadius: 10, 
      borderColor: '#d7d7d7',
      borderWidth: 2,
    },
    cardTitle: { 
      fontSize: 16, 
      fontWeight: 'bold', 
      marginBottom: 8 
    },
    cardBody: {
      fontSize: 13,
      marginBottom: 8,
      lineHeight: 13,
    },  
    buttonContainer: {
        flexDirection: 'row',
        padding: 2,
        justifyContent: 'space-around',
    },
    form: {
      padding: 8,
      borderColor: '#d7d7d7',
      borderWidth: 2,
      marginBottom: 16,
    },
    fixToText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 4,
    },
});

const width= [40,80,80,80,80,80,200];

function IssueRow(props) {
    const issue = props.issue;
    {/****** Q2: Coding Starts here. Create a row of data in a variable******/}
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{issue.title}</Text>
        <Text style={styles.cardBody}>Status: {issue.status}</Text>
        <Text style={styles.cardBody}>Owner: {issue.owner}</Text>
        <Text style={styles.cardBody}>Created: {issue.created.toDateString()}</Text>
        <Text style={styles.cardBody}>Effort: {issue.effort}</Text>
        <Text style={styles.cardBody}>Due: {issue.due ? issue.due.toDateString() : 'N/A'}</Text>
      </View>
    );
    {/****** Q2: Coding Ends here.******/}
}
  
  
function IssueTable(props) {
    const issueRows = props.issues.map(issue =>
      <IssueRow key={issue.id} issue={issue} />
    );

    return (
      <ScrollView>
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
    /* I assume the new issue will always be new, the assigned status will need assign feature to assign someone as assignee */
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
        <Text style={styles.cardTitle}>Add Issue</Text>
        <TextInput
          style={styles.form}
          placeholder="Title"
          value={this.state.title}
          onChangeText={this.handleTitleChange}
        />
        <TextInput
          style={styles.form}
          placeholder="Owner"
          value={this.state.owner}
          onChangeText={this.handleOwnerChange}
        />
        <TextInput
          style={styles.form}
          placeholder="Effort"
          value={this.state.effort}
          onChangeText={this.handleEffortChange}
        />
        <TextInput
          style={styles.form}
          placeholder="Due Date (YYYY-MM-DD)"
          value={this.state.due}
          onChangeText={this.handleDueChange}
        />
        <View style={styles.buttonContainer}>
          <Button title="Add Issue" onPress={this.handleSubmit} color="#74BFA8" />
          <Button title="Cancel" onPress={this.handleCancel} color="#EC765B" />
        </View>
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
          <Text style={styles.cardTitle}>Blacklist User</Text>
          <TextInput
            placeholder="Name"
            value={this.state.name}
            onChangeText={this.handleNameChange}
            style={styles.form}
          />
          <View style={styles.buttonContainer}>
            <Button title="Add to Blacklist" onPress={this.handleSubmit} color="black" />
            <Button title="Cancel" onPress={this.handleCancel} color="#EC765B" />
          </View>
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
      this.setState((prevState) => ({ showForm: !prevState.showForm, showBlacklistForm: false }));
    }

    toggleBlacklistForm() {
      this.setState((prevState) => ({ showBlacklistForm: !prevState.showBlacklistForm, showForm: false }));
    }
    
    render() {
    return (
    <>    
      <View style={styles.container}>
        

    {/****** Q2: Start Coding here. ******/}
    {/****** Q3: Start Coding here. ******/}
    {this.state.showForm ? (
      <IssueAdd createIssue={this.createIssue} toggleForm={this.toggleForm} />
    ) : this.state.showBlacklistForm ? (
      <BlackList toggleBlacklistForm={this.toggleBlacklistForm} />
    ) : (
      <>
        {/****** Q1: Start Coding here. ******/}
        {/****** Q4: Start Coding here. ******/}
        <View style={styles.buttonContainer}>
          <IssueFilter />
          <Button title="Add New Issue" onPress={this.toggleForm} color="#74BFA8" />
          <Button title="Blacklist User" onPress={this.toggleBlacklistForm} color="black" />
        </View>    
        
        {/****** Q1: Code ends here ******/}
        <IssueTable issues={this.state.issues} />
        
            
      </>
    )}
    {/****** Q2: Code ends here ******/}
    {/****** Q3: Code Ends here. ******/}
    {/****** Q4: Code Ends here. ******/}    
      </View>
    </>
      
    );
  }
}
