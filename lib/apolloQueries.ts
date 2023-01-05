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

export const SINGLE_CHARACTER_QUERY = gql`
	query character($id: ID!) {
		character(id: $id) {
			id
			name
			status
			species
			type
			gender
			origin {
				name
				type
			}
			location {
				name
				type
			}
			image
			episode {
				id
				name
				episode
			}
		}
	}
`;
