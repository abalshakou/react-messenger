import 'tachyons';
import FirstScreen from './client/FirstScreen';
import {ApolloProvider} from '@apollo/client'
import apolloClient from './server/ApolloSetup';

function App() {

    return (
        <>
            <ApolloProvider client={apolloClient}>
                <FirstScreen/>
            </ApolloProvider>
        </>
    );
}

export default App;
