import React, { PropTypes } from 'react'
import 'isomorphic-fetch'
import Link from 'next/link'

export default class CharactersPage extends React.Component {
    static propTypes = {
        from: PropTypes.string,
        characters: PropTypes.array
    }

    static defaultProps = {
        from: 'nobody',
        characters: []
    }

    static async getInitialProps ({ req }) {
        const res = await fetch('//swapi.co/api/people/')
        const json = await res.json()

        return { characters: json.results, from: req ? 'server' : 'client' }
    }
    render () {
        return (
            <div>
                <h1>Characters from Star Wars</h1>
                <p>
                    Try <Link href="/"><a>planets</a></Link>
                </p>
                <h2>All hail {this.props.from}</h2>
                <ul>
                    {this.props.characters.map((person) => (
                        <li key={person.name}>{person.name}</li>
                    ))}
                </ul>
            </div>
        )
    }
}