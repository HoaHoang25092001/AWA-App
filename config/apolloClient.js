import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setContext } from "apollo-link-context";

const httpLink = createHttpLink({
  uri: "https://api-awa-dev.amazingtech.vn/graphql/",
});
const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
const defaultOptions = {
  query: {
    fetchPolicy: "no-cache",
  },
};
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Kết hợp AuthLink và HttpLink
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});

export default client;
