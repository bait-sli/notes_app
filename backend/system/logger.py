import sys
import datetime


def colored(r, g, b, text):
    return "\033[38;2;{};{};{}m{} \033[38;2;255;255;255m".format(r, g, b, text)


class Logger:
    def __init__(self, name: str):
        self.name = name

    def log(self, message: dict):
        coloredText = colored(20, 255, 20, f"[{self.name}] {datetime.datetime.now()}: ")
        print(coloredText, message)

    def error(self, message: dict):
        coloredText = colored(255, 0, 0, f"[{self.name}] {datetime.datetime.now()}: ")
        print(coloredText, message)

    def warning(self, message: dict):
        coloredText = colored(255, 255, 0, f"[{self.name}] {datetime.datetime.now()}: ")
        print(coloredText, message)

    def info(self, message: dict):
        coloredText = colored(0, 255, 0, f"[{self.name}] {datetime.datetime.now()}: ")
        print(coloredText, message)
