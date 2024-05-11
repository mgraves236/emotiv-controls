# Sterowanie w grze komputerowej za pomocą technologii EEG

W ramach projektu stworzono skrypt wykorzystujący [Cortex API](https://emotiv.gitbook.io/cortex-api), który interpretuje komendy umysłowe 
zdefiniowane i wytrenowane w aplikacji EmotivBCI i na ich podstawie
symuluje wejście z klawiatury, które odpowiada za sterowanie postacią w grze.

Ponieważ do dostępu do surowych danych z EEG wymagana jest płatna
licencja, używano komend oferowanych przez aplikację
EmotivBCI: *push, lift, left, right*. Komenda *push* odpowiada
za wciskanie klawisza *S/strzałka w dół*, komenda *lift* za wciskanie
klawisza *W/strzałka w górę*, komenda *left* oraz *right* odpowiednio
za wciskanie klawiszy *A/strzałka w lewo* i *D/strzałka w prawo*.

Sktypt wymaga zainstalowania bibliotek: `pip install websocket-client`, `pip install python-dispatch`,
`pip install pynput`.

Aby korzystać ze skryptu symulującego emocje, należy podjąć następujace czynności:

1. Posiadać jedno z urządzeń firmy Emotiv służące do zbierania sygnału EEG.
2. Założyć  konto Emotic oraz pobrać aplikację [EmotivBCI](https://www.emotiv.com/products/emotiv-bci).
3. Wytrenować wcześniej wymionene komendy w powyższej aplikacji.
4. Zarejestrować nową aplikację na swoim koncie [pod niniejszym linkiem](https://account.emotiv.com/my-account/cortex-apps/).
5. Skopiować dane uwierzytelniające aplikację i nazwę wytrenowanego profilu oraz wkleić je do pliku `live_advance.py` w miejsca wyznaczone w funkcji `main()`:
 ```python
def main():

    # Please fill your application clientId and clientSecret before running script
    your_app_client_id = ''
    your_app_client_secret = ''

    # Init live advance
    l = LiveAdvance(your_app_client_id, your_app_client_secret)

    trained_profile_name = ''  # Please set a trained profile name here
    l.start(trained_profile_name
```
6. Uruchomić skrypt `live_advance.py`. Skrypt zbiera dane w trybie *live* i interpretuje je jako wejście z klawiatury.
7. Po uruchomieniu skryptu w programie Emotiv Launcher należy go zautrozywać, klikając odpowiedni przycisk.

Skrypt został stworozny na podstawie [materiałów udostępnionych przez firmę Emotiv](https://github.com/Emotiv/cortex-example/tree/master/python).

Fragment odpowiadający za symulację wejścia z klawiatury:
```python
def handle_controls(data):
    command = data["action"]
    if command == 'push':
        keyboard.press('s')
        keyboard.release('s')
    if command == 'lift':
        keyboard.press('w')
        keyboard.release('w')
    if command == 'left':
        keyboard.press('a')
        keyboard.release('a')
    if command == 'right':
        keyboard.press('d')
        keyboard.release('d')

```


Aby przetestować działanie skryptu, zaimplementowano prostą grę w języku JavaScript. Gra polega
na przejściu labiryntu, który jest generowany za każdym odpaleniem gry. Grafika do gry została wygenerowana
za pomocą Kreatora obrazów udostępnionego przez firmę Microsoft opartym na modelu DALL-E 3.

Gra nie wymaga uprzedniej kompilacji i aby ją uruchomić, należy otworzyć plik `index.html` w przeglądarce internetowej.

