

if (config.availableInTypes?.indexOf(event.target?.type || '') === -1) {
  return;
}
setTimeout(() => render({ ...currentState, input: event.target }), 100);
