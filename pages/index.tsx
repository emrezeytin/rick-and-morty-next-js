import {
	Badge,
	Box,
	Image,
	Group,
	SimpleGrid,
	Text,
	Title,
	Stack,
	Card,
} from "@mantine/core";
import { gql } from "@apollo/client";
import client from "../lib/apolloClient";
import { statusColor } from "../helpers/statusColor";

export default function Home({ characters }: any) {
	return (
		<SimpleGrid
			cols={3}
			breakpoints={[
				{ maxWidth: "md", cols: 3 },
				{ maxWidth: "sm", cols: 2 },
				{ maxWidth: "xs", cols: 1 },
			]}
		>
			{characters.map((item: any) => (
				<Card
					key={item.id}
					component="article"
          radius={0}
					sx={(theme) => ({
						backgroundColor: theme.colors.dark[6],
					})}
				>
					<Card.Section>
						<Image
							src={item.image}
							alt={item.name}
							fit="cover"
						/>
					</Card.Section>
					<Group position="apart" mt="md">
						<Title order={3}>{item.name}</Title>
						<Badge
							color={statusColor(item.status)}
							radius="sm"
						>
							{item.status}
						</Badge>
					</Group>
					<Text>{item.species}</Text>
				</Card>
			))}
		</SimpleGrid>
	);
}

export async function getServerSideProps() {
	const { data } = await client.query({
		query: gql`
			query {
				characters(page: 1) {
					results {
						id
						name
						status
						species
						type
						gender
						image
					}
				}
			}
		`,
	});

	return {
		props: {
			characters: data.characters.results,
		},
	};
}

// get server side props with apollo client and make query with gql
