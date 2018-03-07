import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Tests from '/imports/api/test/tests.js';

class TestSimpleSchema extends Component {
  onTestFailInsert(e) {
    e.preventDefault();
    Meteor.call('test.insert', { data: { title: 'abc' } }, (error, result) => {
      if (error) {
        console.log('error', error);
      }
      if (result) {
        console.log(result);
      }
    });
  }

  onTestSuccessInsert(e) {
    e.preventDefault();
    Meteor.call('test.insert', { data: { title: 'abc', body: 'something in body' } }, (error, result) => {
      if (error) {
        console.log('error', error);
      }
      if (result) {
        console.log(result);
      }
    });
  }

  renderTestDataItems() {
    const { data } = this.props;

    return data.map(item =>
      (
        <div key={item._id} className="row">
          <div className="col s4">
            {item._id}
          </div>
          <div className="col s4">
            {item.title}
          </div>
          <div className="col s4">
            {item.body}
          </div>
        </div>
      ));
  }

  renderTestData() {
    const { data, loading } = this.props;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (data.length === 0) {
      return null;
    }

    return (
      <div>
        <h3>Reactive data with Redis Oplog</h3>
        {this.renderTestDataItems()}
      </div>
    );
  }

  render() {
    return (
      <div className="test-data">
        <div className="row">
          <div className="col s6">
            <button className="btn" onClick={(e) => { this.onTestFailInsert(e); }}>Test fail insert</button>
          </div>
          <div className="col s6">
            <button className="btn" onClick={(e) => { this.onTestSuccessInsert(e); }}>Test success insert</button>
          </div>
        </div>
        {this.renderTestData()}
      </div>
    );
  }
}

export default withTracker(() => {
  const returnObj = {
    data: [],
    loading: true,
  };

  let testSub;
  if (Meteor.isClient) {
    testSub = Meteor.subscribe('tests.all', {});
  }
  if (Meteor.isServer || (testSub && testSub.ready())) {
    returnObj.data = Tests.find({}).fetch();
    returnObj.loading = false;
  }

  return returnObj;
})(TestSimpleSchema);
