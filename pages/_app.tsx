import { useState } from "react";
import {
	AppShell,
	Navbar,
	Header,
	Text,
	MediaQuery,
	Burger,
	useMantineTheme,
	MantineProvider,
} from "@mantine/core";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
	const theme = useMantineTheme();
	const [opened, setOpened] = useState(false);
	return (
		<MantineProvider
			withGlobalStyles
			withNormalizeCSS
			theme={{ colorScheme: "dark" }}
		>
			<AppShell
				styles={{
					main: {
						background:
							theme.colorScheme === "dark"
								? theme.colors.dark[8]
								: theme.colors.gray[0],
					},
				}}
				navbarOffsetBreakpoint="sm"
				navbar={
					<Navbar
						p="md"
						hiddenBreakpoint="sm"
						hidden={!opened}
						width={{ sm: 200, lg: 300 }}
					>
						<Text>Application navbar</Text>
					</Navbar>
				}
				header={
					<Header
						height={{ base: 50, md: 70 }}
						p="md"
					>
						<div
							style={{ display: "flex", alignItems: "center", height: "100%" }}
						>
							<MediaQuery
								largerThan="sm"
								styles={{ display: "none" }}
							>
								<Burger
									opened={opened}
									onClick={() => setOpened((o) => !o)}
									size="sm"
									color={theme.colors.gray[6]}
									mr="xl"
								/>
							</MediaQuery>
							<Text>Application header</Text>
						</div>
					</Header>
				}
			>
				<Component {...pageProps} />
			</AppShell>
		</MantineProvider>
	);
}
