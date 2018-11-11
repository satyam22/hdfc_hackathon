import React, { Component } from 'react';
import { Table, Input, Button, Icon, Spin } from 'antd';
import { Link } from 'react-router-dom';

export default class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchNameText: '',
    };
  }

  handleSearch = (selectedKeys, confirm) => () => {
    confirm();
    this.setState({ searchNameText: selectedKeys[0] });
  }

  handleReset = (clearFilters) => () => {
    clearFilters();
    this.setState({ searchNameText: '' });
  }

  render() {
    const { projects } = this.props;
    const columns = [
      {
        title: 'Project Name',
        dataIndex: 'title',
        key: 'title',
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) =>
          (
            <div className="custom-filter-dropdown">
              <Input
                ref={ele => this.searchInput = ele}
                placeholder="Search name"
                value={selectedKeys[0]}
                onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={this.handleSearch(selectedKeys, confirm)}
              />
              <Button type="primary" onClick={this.handleSearch(selectedKeys, confirm)} >Search</Button>
              <Button onClick={this.handleReset(clearFilters)}>Reset</Button>
            </div>
          ),
        filterIcon: filtered => <Icon type='search' style={{ color: filtered ? '#108ee9' : '#aaa' }} />,
        onFilter: (value, project) => project.title.toLowerCase().includes(value.toLowerCase()),
        width: '250px',
        render: (text, project) => <Link to={`/${project.id}`}>{text}</Link>
      },
      {
        title: 'Percentage Funded',
        dataIndex: 'percentageFunded',
        key: 'percentageFunded',
        sorter: (a, b) => (a.percentageFunded - b.percentageFunded),
        width: '100px'
      },
      {
        title: 'Amount Pledged',
        dataIndex: 'amountPledged',
        key: 'amountPledged',
        width: '150px',
        sorter: (a, b) => (a.amountPledged - b.amountPledged),
      },
      {
        title: 'End time',
        dataIndex: 'endTime',
        key: 'endTime',
        width: '150px',
        sorter: (a, b) => {
          const firstTime = (new Date(a.endTime)).getTime();
          const secondTime = (new Date(b.endTime)).getTime();
          return firstTime - secondTime;
        }
      }
      // {
      //   title: 'Industry',
      //   dataIndex: 'industry',
      //   key: 'industry',
      //   width: '150px',
      //   filters: industries.map(industry => ({ text: industry, value: industry })),
      //   onFilter: (value, record) => record.industry.includes(value)

      // }
    ]
    return (
      <div className="projects">
        <div className="App-header">Top Kickstarter projects</div>
        {
          projects.length === 0 ?
            (
              <Spin size="large" className="spinner" />
            ) :
            (
              <Table dataSource={projects}
                columns={columns}
                className="projects-table"
              />
            )
        }
      </div>
    );
  }
}