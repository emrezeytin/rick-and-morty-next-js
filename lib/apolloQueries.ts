import gql from "graphql-tag";

export const ALL_CHARACTERS_QUERY = gql`
	query characters($page: Int) {
		characters(page: $page) {
			results {
				id
				name
				status
				species
				type
				gender
				image
				episode {
					id
				}
			}
			info {
				pages
				next
				prev
			}
		}
	}
`;
