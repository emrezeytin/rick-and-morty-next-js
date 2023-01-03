import {
	Badge,
	Image,
	Text,
	Title,
	Card,
	Grid,
	Pagination,
	Skeleton,
	LoadingOverlay,
} from "@mantine/core";
import client from "../lib/apolloClient";
import { statusColor } from "../helpers/statusColor";
import { useState } from "react";
import { ALL_CHARACTERS_QUERY } from "../lib/apolloQueries";
import { useQuery } from "@apollo/client";

export default function Home() {
	const [activePage, setPage] = useState(1);
	const { data, loading } = useQuery(ALL_CHARACTERS_QUERY, {
		variables: { page: activePage },
	});

	return (
		<>
			<LoadingOverlay
				visible={loading}
				overlayBlur={2}
			/>
			<Grid
				mt="md"
				gutter="md"
			>
				{data?.characters?.results?.map((item: any) => {
					return (
						<Grid.Col
							key={item.id}
							xs={6}
							sm={6}
							md={4}
							lg={3}
						>
							<Card
								component="article"
								radius={0}
								sx={(theme) => ({
									backgroundColor: theme.colors.dark[6],
								})}
							>
								<Card.Section style={{ position: "relative" }}>
									<Image
										src={item.image}
										alt={item.name}
										width="100%"
										height={300}
										fit="cover"
										withPlaceholder
									/>
									<Badge
										color={statusColor(item.status)}
										radius="xs"
										size="sm"
										variant="filled"
										style={{ position: "absolute" }}
										sx={(theme) => ({
											top: theme.spacing.xs,
											right: theme.spacing.xs,
										})}
									>
										{item.status}
									</Badge>
								</Card.Section>
								<Title
									order={2}
									size="h4"
									mt="md"
								>
									{item.name}
								</Title>
								<Text color="dimmed">{item.species}</Text>
								<Text size="sm">
									Seen on {item.episode.length}{" "}
									{item.episode.length === 1 ? "episode" : "episodes"}.
								</Text>
							</Card>
						</Grid.Col>
					);
				})}
			</Grid>
			<Pagination
				mt="lg"
				page={activePage}
				onChange={setPage}
				total={data?.characters?.info?.pages}
			/>
		</>
	);
}

// export async function getServerSideProps({ params }: any) {
// 	const { data } = await client.query({
// 		query: ALL_CHARACTERS_QUERY,
//     variables: {page: 1 }
// 	});

// 	return {
// 		props: {
// 			characters: data.characters,
// 		},
// 	};
// }
