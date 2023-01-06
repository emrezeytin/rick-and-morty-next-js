import {
	Badge,
	Image,
	Text,
	Title,
	Card,
	Grid,
	LoadingOverlay,
} from "@mantine/core";
import { statusColor } from "helpers/statusColor";
import { SINGLE_CHARACTER_QUERY } from "lib/apolloQueries";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

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
			<Grid
				mt="md"
				gutter="md"
			>
				<Grid.Col span={12}>
					<Title order={1}>{data?.character?.name}</Title>
				</Grid.Col>
			</Grid>
		</>
	);
};
