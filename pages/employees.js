import { gql } from '@apollo/client'
import Link from 'next/link'
import Layout from "../components/Layout";

import { client } from '../lib/apolloClient'

const GET_EMPLOYESS = gql`
query getEmployees {
    employees(first: 10, after: null) {
        nodes {
          ...EmployeeFields
        }
      }
}

fragment EmployeeFields on Employee {
    name
    position
    profileImage {
      mediaItemId
      mediaItemUrl
      altText
      caption
      description
      mediaDetails {
        height
        width
        sizes {
          file
          fileSize
          height
          mimeType
          name
          sourceUrl
          width
        }
      }
    }
    about
    taskList {
      edges {
        node {
          id
        }
      }
    }
  }
`

export default function Employees(props) {
    const { employees } = props;

    return (
        <Layout>
            <h1>Employees</h1>
            <ul className="employee-list">
                {employees.map((employee) => {
                    <li key={employee.databaseId}>
                        <article>
                            {employee.name}
                        </article>
                    </li>
                })}
            </ul>
        </Layout>
    )
}

export async function getStaticProps() {
    const response = await client.query({
        query: GET_EMPLOYESS,
    })

    return {
        props: {
            employees: response.data.employees.nodes
        }
    }
}