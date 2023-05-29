import React, { Component } from 'react'

export default class Expense extends Component {
  render() {
    var i = 0
    return (
      <div className='innerIncome'>
        <p>{this.props.i}</p>
        <p>
         // {new Date(new Date(this.props.createdAt)).format('YYYY-MM-DD')}
        </p>
        <p>
          Total Salary paid Rs {this.props.salaryAmount} to{' '}
          {this.props.teacher_name
            ? this.props.teacher_name
            : this.props.staff_name}
        </p>
      </div>
    )
  }
}
