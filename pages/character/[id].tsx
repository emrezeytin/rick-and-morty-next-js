import {
	Badge,
	Image,
	Text,
	Title,
	Card,
	Grid,
	LoadingOverlay,
	Box,
	SimpleGrid,
	Container,
	Stack,
	Anchor,
} from "@mantine/core";
import { statusColor } from "helpers/statusColor";
import { SINGLE_CHARACTER_QUERY } from "lib/apolloQueries";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Character() {
	const router = useRouter();
	const characterId = router.query.id;
	const { data, loading } = useQuery(SINGLE_CHARACTER_QUERY, {
		variables: { id: characterId as ID },
	});
	console.log(data);
	return (
		<>
			<LoadingOverlay
				visible={loading}
				overlayBlur={2}
			/>
			<Container>
				<Title order={1}>{data?.character?.name}</Title>
        <Text>{data?.character?.status}</Text>
				<Title order={2}>Episodes:</Title>
				<SimpleGrid cols={5}>
					{data?.character?.episode?.map((episode: any) => {
						return (
							<Box
								key={episode.id}
								sx={(theme) => ({
									backgroundColor: theme.colors.dark[6],
									padding: theme.spacing.md,
								})}
							>
								<Stack spacing={0}>
									<Title
										order={3}
										size="h4"
									>
										{episode.name}
									</Title>
									<Text>{episode.episode}</Text>
									<Text
										color="dimmed"
										fz="xs"
									>
										{episode.air_date}
									</Text>
									<Anchor
										component={Link}
										href="/episode/[id]"
										as={`/episode/${episode.id}`}
									>
										Detail
									</Anchor>
								</Stack>
							</Box>
						);
					})}
				</SimpleGrid>
			</Container>
		</>
	);
}
