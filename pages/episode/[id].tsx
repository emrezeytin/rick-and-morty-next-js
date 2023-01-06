import {
	Badge,
	Image,
	Text,
	Title,
	Card,
	Grid,
	LoadingOverlay,
} from "@mantine/core";
import { SINGLE_EPISODE_QUERY } from "lib/apolloQueries";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

function Episode() {
	const router = useRouter();
	const episodeId = router.query.id;
	const { data, loading } = useQuery(SINGLE_EPISODE_QUERY, {
		variables: { id: episodeId as ID },
	});
	console.log(data);
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
				<Grid.Col span={12}>
					<Title order={1}>{data?.episode?.name} - {data?.episode?.episode}</Title>
				</Grid.Col>
			</Grid>
		</>
	);
}

export default Episode;
