import React, { PropTypes } from 'react'
import Link from 'next/link'

import 'isomorphic-fetch'

export default class IndexPage extends React.Component {
    static propTypes = {
        from: PropTypes.string,
        planets: PropTypes.array
    }

    static defaultProps = {
        from: 'nobody',
        planets: []
    }

    static async getInitialProps ({ req }) {
        const res = await fetch('//swapi.co/api/planets/')
        const json = await res.json()

        return { planets: json.results, from: req ? 'server' : 'client' }
    }
    render () {
        return (
            <div>
                <h1>Star Wars Planets</h1>
                <p>
                    Try <Link href="/characters"><a>characters</a></Link>
                </p>
                <h2>All hail {this.props.from}</h2>
                <ul>
                    {this.props.planets.map((planet) => (
                        <li key={planet.name}>{planet.name}</li>
                    ))}
                </ul>
            </div>
        )
    }
}