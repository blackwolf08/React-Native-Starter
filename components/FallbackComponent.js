const fallBackComponent = () => {
  return (
    <View style={styles.containerFlex}>
      <AppLoading size="large" />
    </View>
  );
};

export default fallBackComponent;
